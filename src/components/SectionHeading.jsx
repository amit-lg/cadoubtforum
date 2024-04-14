import PropTypes from 'prop-types'
const SectionHeading = ({text}) => {
  return (
    <h3 className='text-xl font-semibold'>
        {text}
    </h3>
  )
}

export default SectionHeading

SectionHeading.propTypes = {
  text: PropTypes.string
}