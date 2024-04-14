import PropTypes from 'prop-types'
const FeedContainer = ({children}) => {
  return (
    <div className='grid mt-5 lg:mt-0 grid-cols-1 space-y-12 lg:space-y-0 sm:grid-cols-1 lg:grid-cols-2 gap-6 justify-around bg-transparent'>
        {children}
    </div>
  )
}

export default FeedContainer

FeedContainer.propTypes = {
    children: PropTypes.node
}