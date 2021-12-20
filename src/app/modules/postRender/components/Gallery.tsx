import {useState} from 'react'
import {Modal, Carousel, CarouselItem} from 'react-bootstrap-v5'
import {XIcon, ViewGridIcon} from '@heroicons/react/solid'

type Props = {
  images: string[]
}

export const Gallery: React.FC<Props> = (props) => {
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const {images} = props

  const handleImageClick = () => {
    setViewerIsOpen(true)
  }

  return (
    <>
      <div style={{position: 'relative', cursor: 'pointer'}} onClick={handleImageClick}>
        {images.length > 1 ? (
          <svg width='25' height='25' style={{position: 'absolute', top: 0, right: 0}}>
            <ViewGridIcon />
          </svg>
        ) : (
          <></>
        )}
        <img src={images[0]} alt='img' width='100%' style={{display: 'blocked'}} />
      </div>
      <Modal
        show={viewerIsOpen}
        fullscreen='lg-down'
        size='lg'
        onHide={() => setViewerIsOpen(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title></Modal.Title>
          <span
            onClick={() => setViewerIsOpen(false)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              color: 'black',
              opacity: hover ? '100%' : '60%',
              cursor: 'pointer',
            }}
          >
            <svg width='25' height='25'>
              <XIcon />
            </svg>
          </span>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {images.map((image, index) => {
              return (
                <CarouselItem key={index}>
                  <div
                    style={{
                      height: '500px',
                    }}
                  >
                    <img
                      src={image}
                      className='d-block'
                      alt='post'
                      style={{
                        width: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  )
}
