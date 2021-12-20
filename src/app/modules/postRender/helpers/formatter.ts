import {
  ELEMENT_PARAGRAPH,
  ELEMENT_MENTION,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_IMAGE,
  ELEMENT_IMAGE_LIST,
  ELEMENT_SHOW_MORE,
  ELEMENT_HASHTAG,
} from '../render'
import {TNode} from '@udecode/plate-core'

import {Post} from '../../../interfaces'

export const formatStringToNode = (string: string): TNode => {
  return {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: string,
      },
    ],
  }
}

export const formatShowMore = (value: string, maxLength?: number): TNode[] => {
  const showMore = maxLength && value.length > maxLength
  const text = maxLength && showMore ? value.slice(0, maxLength) : value
  const nodes: TNode[] = [formatStringToNode(text)]

  if (showMore) {
    nodes.push({
      type: ELEMENT_SHOW_MORE,
      children: [
        {
          text: '',
        },
      ],
    })
  }

  return nodes
}

export const hasMedia = (nodes: TNode[]): boolean => {
  const match = nodes.filter((node) => [ELEMENT_MEDIA_EMBED, ELEMENT_IMAGE].includes(node.type))

  return match.length > 0
}

export const formatToString = (node: TNode): string => {
  if (node.text) {
    return node.text.trim()
  }

  return node.children ? node.children.map((element: TNode) => formatToString(element)) : ''
}

export const deserialize = (postText: string, maxLength?: number): TNode[] => {
  let nodes: TNode[] = []

  try {
    const originNodes = JSON.parse(postText) as TNode[]
    nodes = originNodes

    if (Array.isArray(nodes)) {
      const text = nodes.map(formatToString).join(' ')

      if (maxLength && text.length > maxLength) {
        nodes = [
          formatStringToNode(text.slice(0, maxLength)),
          {
            type: ELEMENT_SHOW_MORE,
            children: [
              {
                text: '',
              },
            ],
          },
        ]

        if (hasMedia(originNodes)) {
          const url: string[] = []
          for (const node of originNodes) {
            if ([ELEMENT_MEDIA_EMBED, ELEMENT_IMAGE].includes(node.type)) {
              url.push(node.url)
            }
          }

          nodes.push({
            type: ELEMENT_IMAGE_LIST,
            children: [{text: ''}],
            url: url,
          })
        }
      }
    } else {
      nodes = formatShowMore(postText, maxLength)
    }
  } catch (e) {
    nodes = formatShowMore(postText, maxLength)
  }

  return nodes
}

export const serialize = (nodes: TNode[]): Partial<Post> => {
  const post: Partial<Post> = {
    text: JSON.stringify(nodes),
    tags: [],
    mentions: [],
  }

  const checkAttributes = (children: any) => {
    switch (children.type) {
      case ELEMENT_MENTION:
        post.mentions?.push({
          id: children.value,
          name: children.name,
          username: children.name,
        })
        break
      case ELEMENT_HASHTAG:
        post.tags?.push(children.hashtag)
        break
      default:
        if (children.children) {
          for (const node of children.children) {
            checkAttributes(node)
          }
        }
        break
    }
  }

  for (const node of nodes) {
    checkAttributes(node)
  }

  return post
}
