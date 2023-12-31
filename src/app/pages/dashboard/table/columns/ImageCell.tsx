/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../core/_models'

type Props = {
  user: User
}

const colors = ['danger', 'success', 'info', 'warning', 'primary']

const ImageCell: FC<Props> = ({ user }) => {

  const [defaultImage, setDefaultImage] = useState(true);
  const [color, setColor] = useState('primary');


  useEffect(() => {
    renderImage();
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor)
  }, [])
  const renderImage = () => {
    if (user.image) {
      fetch(`${user?.image}`)
        .then(res => {
          if (res.status == 404) {
            setDefaultImage(true);
          } else {
            setDefaultImage(false)
          }
        })
        .catch(err => {
          setDefaultImage(true)
        })
    } else {
      setDefaultImage(true)
    }
  }

  let shortName = user.name;
  shortName = shortName ? shortName?.slice(0, 1) : 'D';

  return <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <Link to={`/products/edit/${user.id}`}>
        {defaultImage ? (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-${color}`,
              `text-${color}`
            )}
          >
            {shortName}
          </div>
        ) : (
          <div className='symbol-label'>
            <img src={user.image} alt={user.name} className='w-100' />
          </div>
        )}
      </Link>
    </div>
    <div className='d-flex flex-column'>
      <Link to={`/products/edit/${user.id}`} className='fs-6 text-gray-800 text-hover-primary'>
        {user.name}
      </Link>
      <span className='fw-bold text-gray-400'>ID: {user.id}</span>
    </div>
  </div>

}

export { ImageCell }
