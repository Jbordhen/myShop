import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}
Meta.defaultProps = {
    title: 'Welcome to myShop',
    description: 'We sell the best products at a low price',
    keywords: 'electronics, cheap electronics'
}

export default Meta
