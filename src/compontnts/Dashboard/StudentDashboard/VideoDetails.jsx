import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css'; // Import video-react CSS

function VideoDetails() {
  const location = useLocation();
  const playerRef = useRef();
  const { course } = useSelector(state => state.course);
  const { sectionId, subSectionId } = useParams();
  const Section = course?.courseContents.find(section => section._id === sectionId);
  const SubSection = Section?.subSection?.find(subSection => subSection._id === subSectionId);

  const [videoUrl, setVideoUrl] = useState(null);
  const url = SubSection?.videoUrl;
  useEffect(() => {
    setVideoUrl(url);
  }, [location.pathname, sectionId, subSectionId, course,url]);

  console.log(subSectionId, videoUrl);

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-4">
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          src={videoUrl}
        >
          <BigPlayButton position="center" />
        </Player>
      </div>
      <div className="flex-1 p-4">
      <h1 className="mt-4 text-3xl font-semibold">{SubSection?.title}</h1>
      <p className="pt-2 pb-6">{SubSection?.description}</p>
      </div>
    </div>
  );
}

export default VideoDetails;
