import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_IMAGE,
  ELEMENT_HASHTAG,
  ELEMENT_SHOW_MORE,
  ELEMENT_SHOW_LESS,
  ELEMENT_UL, 
  ELEMENT_OL, 
  ELEMENT_LIC,
  ELEMENT_LINK,
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_RIGHT,
  ELEMENT_ALIGN_LEFT,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_MEDIA_EMBED,
} from '../render'
import escapeHTML from 'escape-html'
import React, {useCallback, useState} from 'react'
import {deserialize, formatToString} from '../helpers/formatter'
import {ShowMore, ShowLess, Gallery} from './'
import { Video } from '..'

type Props = {
  postText: string
  max?: number
  onShowAll: () => void
  onShowLess: () => void
}

export const PostRender: React.FC<Props> = (props) => {
  const {postText, max, onShowAll, onShowLess} = props
  let [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  let nodes = deserialize(postText)

  const originText = nodes.map(formatToString).join('')
  let showMore = false

  if (max && originText.length > max) {
    nodes = deserialize(postText, max)
    nodes = nodes.filter(node => node.type !== ELEMENT_SHOW_LESS)
    showMore = true
  }

  if (!max && maxLength && originText.length > maxLength) {
    nodes.push({
      type: ELEMENT_SHOW_LESS,
      children: [
        {
          text: '',
        },
      ],
    })
  }

  const renderPost = () => {
    const render: any[] = []
    let imageUrls: string[] = []

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const nextNode = nodes[i + 1]

      if (node.type === ELEMENT_IMAGE) {
        if (nextNode && nextNode.type === ELEMENT_IMAGE) {
          imageUrls.push(node.url as string)
          continue
        } else {
          imageUrls.push(node.url as string)
          render.push(renderElement(node, imageUrls))
          imageUrls = []
        }
      } else {
        render.push(renderElement(node))
      }
    }

    return render
  }

  const renderElement = useCallback(
    (node, images: string[] = []) => {
      const onShowAllText = () => {
        setMaxLength(max);
        onShowAll()
      }

      if (node.text) {
        if (Object.keys(node).length === 1) {
          const splitNewLine = node.text.split('\n')

          return splitNewLine.map((item: string, key: number) => (
            <span key={key}>
              {item}
              {key !== splitNewLine.length - 1 && <br />}
            </span>
          ))
        }

        return (
          <span            
            style={{
              fontWeight: node.bold ? 600 : 400,
              fontStyle: node.italic ? 'italic' : 'none',
              textDecoration: node.underline
                ? 'underline'
                : node.strikethrough
                ? 'line-through'
                : 'none',
            }}
          >
            {node.text}
          </span>
        )
      }

      const children = node?.children ? node.children.map((node: any) => renderElement(node)) : ''

      switch (node.type) {
        case ELEMENT_BLOCKQUOTE:
          return (
            <blockquote>
              <p >{children}</p>
            </blockquote>
          )

        case ELEMENT_PARAGRAPH:
          if (showMore) {
            return <span>{children}</span>
          }

          return <p>{children}</p>

        case ELEMENT_H1:
          return <h1>{children}</h1>

        case ELEMENT_H2:
          return <h2>{children}</h2>

        case ELEMENT_H3:
          return <h3>{children}</h3>

        case ELEMENT_H4:
          return <h4>{children}</h4>

        case ELEMENT_H5:
          return <h5>{children}</h5>

        case ELEMENT_H6:
          return <h6>{children}</h6>

        case ELEMENT_ALIGN_CENTER:
          return <div style={{textAlign: 'center'}}>{children}</div>

        case ELEMENT_ALIGN_RIGHT:
          return <div style={{textAlign: 'right'}}>{children}</div>

        case ELEMENT_ALIGN_LEFT:
          return <div style={{textAlign: 'left'}}>{children}</div>

        case ELEMENT_ALIGN_JUSTIFY:
          return <div style={{textAlign: 'justify'}}>{children}</div>

        case ELEMENT_UL:
          return <ul>{children}</ul>

        case ELEMENT_OL:
          return <ol>{children}</ol>

        case ELEMENT_LIC:
          return <li>{children}</li>

        case ELEMENT_IMAGE:
          return <Gallery images={images}/>

        case ELEMENT_MEDIA_EMBED:
          return <Video url={node.url}/>

        case ELEMENT_LINK:
          return <a href={escapeHTML(node.url)}>{children}</a>

				case ELEMENT_HASHTAG:
					return (
						<a href={`${process.env.REACT_APP_WEB_URL}/topic/hashtag?tag=${node.hashtag}`}>
							<span                
								style={{
									cursor: 'pointer',
									fontWeight: 600,
									color: "#7342CC",
									display: 'inline-block'
								}}
							>
								#{node.hashtag}
							</span>
						</a>
					)

				case ELEMENT_SHOW_MORE:
					return <ShowMore key={ELEMENT_SHOW_MORE} onClick={onShowAllText} />

        case ELEMENT_SHOW_LESS:
          return <ShowLess key={ELEMENT_SHOW_LESS} onClick={onShowLess}/>

				default:
					return children;
      }
    },
    [showMore, onShowLess, onShowAll, max]
  )

  return <>{renderPost()}</>
}
