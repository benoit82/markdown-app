import Head from 'next/head'
import PropTypes from 'prop-types'

const CustomHead = ({pageTitle, metaName, metaContent}) => {
    return (
      <Head>
        <title>{pageTitle}</title>
        <meta name={metaName} content={metaContent} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    )
}

CustomHead.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  metaName: PropTypes.string.isRequired,
  metaContent: PropTypes.string.isRequired
}

export default CustomHead;