import { Button, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../Config';
import Mainimage from '../Landingpage/Section/Mainimage';
import AntCard from '../commons/AntCard';
import MovieInfo from './MovieInfo';
import List from './List';

const Detail = () => {
  const navigate = useNavigate()

  const { movieId } = useParams()
  // console.log('movieID >>', movieId)

  // 상태 생성하여 저장시키기
  const [movie, setmovie] = useState({}) //응답 타입에 맞게 객체로 타입을 초기값으로 맞춰준다
  const [actors, setactors] = useState([])
  const [creators, setcreators] = useState([])

  // 버튼 상태를 저장하기 - 배우 목록
  const [Actortoggle, setActortoggle] = useState(false)
  // 제작진 목록 버튼 상태
  const [Creatortoggle, setCreatortoggle] = useState(false)

  useEffect(() => {

    // [특정 영화 정보] URL
    let endpointInfo = `${API_URL}${movieId}?api_key=${API_KEY}`
    // console.log('endpointInfo',endpointInfo)

    // [출연진] URL
    let ActorsInfo = `${API_URL}${movieId}/credits?api_key=${API_KEY}`

    // [제작진]URL
    let CreatorsInfo = `${API_URL}${movieId}/credits?api_key=${API_KEY}`
    console.log('credits >>', CreatorsInfo)

    // [특정 영화 정보] 영화 아이디로 정보 요청하기
    fetch(endpointInfo)
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        setmovie(response)
      })

    // [영화 배우 정보] 배우들 정보 요청하기
    fetch(ActorsInfo)
      .then(res => res.json())
      .then(res => {
        console.log(res.cast)
        setactors(res.cast)
      })

    // [영화 제작진 정보] 요청하기
    fetch(CreatorsInfo)
      .then(res => res.json())
      .then(res => {
        setcreators(res.crew)
      })
  }, []);


  // [배우 목록 버튼 핸들러 함수 만들기]
  function toggleActorview() {
    setActortoggle(!Actortoggle)
    // console.log('Actortoggle 상태', Actortoggle) //이 확인용은 함수 실행 전의 상태를 확인 하는 코드이다 위치와는 상관이 없음.
  }

  // [제작진 목록 버튼 핸들러 함수 만들기]
  function toggleCreatorview() {
    setCreatortoggle(!Creatortoggle)
  }

  return (
    <>
      {/* header */}
      {movie && <Mainimage
        image={`${IMAGE_BASE_URL}w1280${movie.poster_path}`}
        title={movie.title}
        overview={movie.overview}
      />}

      {/* 영화 목록 버튼 */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button onClick={() => navigate(-1)}>영화 목록</Button>
      </div>

      {/* body */}
      <div style={{ width: '85%', margin: '0 auto' }}>

        {/* Movie info - 영화 정보 */}
        <MovieInfo movie={movie} />

        <br />
        {/* Actors Grid - 배우 이미지 생성 */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <span style={{ marginRight: '20px' }}>
            <Button
              onClick={toggleActorview}
              type={Actortoggle ? 'primary' : 'dashed'}
            >
              배우 목록
            </Button>
          </span>

          {/* 제작진 이미지 생성 */}
          <span>
            <Button
              onClick={toggleCreatorview}
              type={Creatortoggle ? 'primary' : 'dashed'}
            >
              제작진 목록
            </Button>
          </span>
        </div>

        {/* 배우 리스트 */}
        {Actortoggle &&  // 버튼이 true가 되면 실행이 되게 한다.
          <List props={actors} />
        }

        {/* 제작진 리스트 */}
        {Creatortoggle &&  // 버튼이 true가 되면 실행이 되게 한다.
          <List props={creators}/>
        }
      </div>
    </>
  )
}
export default Detail;