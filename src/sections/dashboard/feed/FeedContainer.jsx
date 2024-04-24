import PropTypes from 'prop-types'
const FeedContainer = ({ children }) => {
  return (
    <div className='grid mt-5 lg:mt-0 grid-cols-12 lg:space-y-0 bg-transparent'>
      {children}
    </div>
  )
}

export default FeedContainer

FeedContainer.propTypes = {
  children: PropTypes.node
}