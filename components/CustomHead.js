import Head from 'next/head'

const CustomHead = ({pageTitle, metaName, metaContent}) => {
    return (
      <Head>
        <title>{pageTitle}</title>
        <meta name={metaName} content={metaContent} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    )
}

export default CustomHead;