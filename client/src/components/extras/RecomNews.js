import React from 'react';
import "./RecomNews.css"
function RecomNews(props) {
    const {totalTweets, newsCat, keyWord, topic, tweetImage} = props;
    return <div className="recomNews">
        <div className='newsLeft'>
            <div className="newsCategory">
                {newsCat}
            </div>
            {topic?
                <div className="newsHeading">
                    {topic.slice(0, 50)}..
                </div> :
                <div className="newsHeading">
                    #{keyWord}
                </div>
            }
            {totalTweets && <div className="totalTweets">
                {totalTweets} Tweets
            </div>}
        </div>
        <div className='newsRight'>
            {tweetImage ?
                <img src={tweetImage} alt="twitter news" />
                :
                <div className='tweetExtra'>...</div>}
        </div>
    </div>;
}

export default RecomNews;
