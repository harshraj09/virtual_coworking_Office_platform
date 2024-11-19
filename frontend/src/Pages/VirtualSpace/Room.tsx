import React from 'react'
import Game from '../../components/Game/Game'
import "./room.css"
// import ReactPlayer from 'react-player'

const Room: React.FC = () => {
  return (
    <div>
      <section className='main-section'>
        <div className='section1'>
          <Game />
        </div>
        <div className="section2">
          <div className="joined-users">
            <div className='my-cam'>
              {/* <ReactPlayer width={"100%"} height={"100%"} url={"https://youtu.be/ZDiQWv-hjtw?si=pdAzHff_nBgzDJKf"} style={{ borderRadius: "10px" }} playing muted/> */}
            </div>
            <div className='my-cam'>

            </div>
            <div className='my-cam'>

            </div>
            <div className='my-cam'>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Room