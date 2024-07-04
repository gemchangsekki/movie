import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../Config';
import Mainimage from '../Landingpage/Section/Mainimage';
import MovieInfo from './MovieInfo';
import { Button, Divider } from 'antd'

const Detail = () => {
  const navigate = useNavigate()

  const {movieId} = useParams()
  // console.log('movieID >>', movieId)

  // 상태 생성하여 저장시키기
  const [movie,setmovie] = useState({}) //응답 타입에 맞게 객체로 타입을 초기값으로 맞춰준다
  const [actors,setactors] = useState([])

  // 버튼 상태를 저장하기 - 배우 목록
  const [Actortoggle,setActortoggle] = useState(false)
  // 제작진 목록 버튼 상태
  const [Creatortoggle,setCreatortoggle] = useState(false)

  useEffect(()=>{
    // console.log('페이지가 로드되면 자동으로 실행됩니다.')
    // [특정 영화 정보] URL
    // https://api.themoviedb.org/3/movie/11?api_key
    let endpointInfo = `${API_URL}${movieId}?api_key=${API_KEY}`
    // console.log('endpointInfo',endpointInfo)

    // [출연진] URL
    // https://api.themoviedb.org/3/movie/movie_id/credits?api_key=language=en-US
    let ActorsInfo = `${API_URL}${movieId}/credits?api_key=${API_KEY}`
    // console.log('actor >>',ActorsInfo)

    // [제작진]URL
    

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
          // console.log('res>> ',res)
          console.log(res.cast)
          setactors(res.cast)
        })
  },[]);
  // [배우 목록 버튼 핸들러 함수 만들기]
  function toggleActorview(){
    // console.log('버튼 클릭!')
    setActortoggle(!Actortoggle)
    console.log('Actortoggle 상태', Actortoggle) //이 확인용은 함수 실행 전의 상태를 확인 하는 코드이다 위치와는 상관이 없음.
  }

  // [제작진 목록 버튼 핸들러 함수 만들기]
  function toggleCreatorview(){
    setCreatortoggle(!Creatortoggle)
  }

  return (
    <>

      

      {/* header */}
      {/* 조건부 렌더링 */}
    {movie && 
    <Mainimage 
        image={`${IMAGE_BASE_URL}w1280${movie.poster_path}`}
        title={movie.title}
        overview={movie.overview}
      />
      }

      {/* 영화 목록 버튼 */}
      <div style={{textAlign: 'center', marginTop: '40px'}}>
        <button onClick={()=>navigate(-1)}>영화 목록</button>
      </div>

      {/* body */}
      <div style={{width: '85%', margin: '0 auto'}}>

      {/* Movie info - 영화 정보 */}
      <MovieInfo movie={movie}/>

      <br/>
      {/* Actors Grid - 배우 이미지 생성 */}
      <div style={{textAlign:'center', marginBottom: '20px'}}>

      <span style={{margin:'20px'}}>
        <Button
        type={Actortoggle ? 'primary' : 'dashed'}
        onClick={toggleActorview}
        >
        배우 목록
        </Button>
        <Button
          type={toggleCreatorview ? 'primary' : 'dashed'}
          onClick={toggleCreatorview}
        >
        제작진 목록
        </Button>
      </span>

      </div>
          {Actortoggle &&  // 버튼이 true가 되면 실행이 되게 한다.
            <Divider type='horizontal' style={{ borderColor: '#ddd' }}>배우 목록
              {/* <Row gutter={[10, 10]}>
                {actors.map(actor => {
                  if (actor.profile_path != null)
                    return (
                      <React.Fragment key={actor.id}>
                          <AntCard
                            Detail
                            path={`${IMAGE_BASE_URL}w400${actor.profile_path}`}
                            name={actor.name}
                            />
                        </React.Fragment>
                    );
                })}
              </Row> */}
            </Divider>
          }

          {toggleCreatorview &&
            <Divider type='horizontal' style={{ borderColor: '#ddd' }}> 제작진 목록
              
            </Divider>
          }
      </div>
    </>
  )
}
export default Detail;