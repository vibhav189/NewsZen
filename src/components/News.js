import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
   
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews= async()=> {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        
        props.setProgress(100);
        setLoading(false)
    }

    useEffect(() => 
         {
            document.title = `${capitalizeFirstLetter(props.category)} - NewsZen`;
            updateNews();
        },
     [])

    

    const handlePreviousClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country
            }&category=${props.category
            }&apiKey=${props.apiKey}&page=${page - 1
            }&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setPage(page-1)
            setArticles(parsedData.articles)
            setLoading(false)
    };
    const handleNextClick = async () => {
        console.log("Next");
        if (
            page + 1 >
            Math.ceil(totalResults / props.pageSize)
        ) {
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country
                }&category=${props.category
                }&apiKey=${props.apiKey}&page=${page + 1
                }&pageSize=${props.pageSize}`;
            setLoading(true);
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            setPage(page+1)
            setArticles(parsedData.articles)
            setLoading(false)
        }
    };

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    
        return (
            <>
                <h2 className="text-center" style={{marginTop:'90px'}}>{props.title}</h2>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row">
                        {articles.map((element) => {                                 
                                 return <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            title={element.title ? element.title : " "}
                                            description={
                                                element.description ? element.description : " "
                                            }
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                
                
            })}
            </div>
            </div>
            </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button
                        disabled={page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={handlePreviousClick}
                    >
                        &laquo; Previous
                    </button>
                    <button
                        disabled={
                            page + 1 >
                            Math.ceil(totalResults / props.pageSize)
                        }
                        type="button"
                        className="btn btn-dark"
                        onClick={handleNextClick}
                    >
                        Next &raquo;
                    </button>
                </div> */}
            </>
    );
    
}


News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
    title: "NewsZen: Top Headlines",
};

News.propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    title: PropTypes.string,
};

export default News;
