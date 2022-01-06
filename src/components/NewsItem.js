import React from 'react'

const NewsItem =(props)=> {
    
        let {title, description, imageUrl, newsUrl, author, date, source} = props 
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl?imageUrl:"https://images.unsplash.com/photo-1586339949216-35c2747cc36d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title" >{title} <span className="badge badge-pill bg-secondary">{source}</span> </h5>
                        <p className="card-text"><small className="text-muted">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
