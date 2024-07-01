import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../Config';
import AntCard from '../commons/AntCard';
import Mainimage from './Section/Mainimage';

function Landingpage() {
  const navigate = useNavigate()

  const [movies, setmovies] = useState([]);
  const [MainmovieImage, setMovieImage] = useState(null);

  const [Currentpage,setCurrentpage] = useState(0);

  useEffect(() => {
    const page = 1
    fetchMovies(page);
  }, []);

  // const loadMoreItems =() =>{
  //   console.log('더보기 누름!')
  //   fetchMovies(2)
  // } >> 기존 코드

  const loadMoreItems =() =>{
    console.log('더보기 누름!')
    fetchMovies(Currentpage +1)
  }

  return (
    <>
      <div style={{ width: '100%' }}>
        {/* main Image */}
        {MainmovieImage &&
          <Mainimage image={`${IMAGE_BASE_URL}w1280${MainmovieImage.poster_path}`}
            title={MainmovieImage.title}
            overview={MainmovieImage.overview}
          />
        }

        {/* 다음 버튼*/}
        <div style={{width:'85%',textAlign: 'right', marginTop: '40px'}}>
          <button onClick={()=>navigate(1)}>다음</button>
        </div>

        <div style={{ width: '85%', margin: '1rem auto' }}>
          <h2>새로 나온 영화</h2>
          <hr />

          {/* movie grid Card */}
          <Row gutter={[10, 10]}>
            {movies.map(movie => {
              return (
                <React.Fragment key={movie.id}>
                  <AntCard
                    landingpage //컴포넌트를 사용하면서 속성을 사용할때 키만 있을 경우 해당이 되는 속성의 값이 true로 고정된다
                    path={`${IMAGE_BASE_URL}w400${movie.poster_path}`}
                    title={movie.title}
                    movieId ={movie.id}
                  />
                </React.Fragment>
              );
            })}
          </Row>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <button onClick={loadMoreItems}>더보기</button>
        </div>
      </div>
    </>
  )

  function fetchMovies(page) {
    const endpoint = `${API_URL}popular?api_key=${API_KEY}&language=en-US&page=${page}`;

    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        console.log(response.page)
        // console.log(response.results)
        // console.log(response.results);
        setmovies([...movies, ...response.results]);
        setMovieImage(response.results[0]);
        setCurrentpage(response.page)
      });
  }
}

export default Landingpage