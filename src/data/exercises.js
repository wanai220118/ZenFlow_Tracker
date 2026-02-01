// Shared image - React Native will cache this
const placeholderImage = require("../../assets/images/placeholder.jpg");

// TEMPORARY: Videos disabled for testing bundle size
// Uncomment below to re-enable videos after confirming app loads
// let videoSourceCache = null;
// const getVideoSource = () => {
//   if (!videoSourceCache) {
//     videoSourceCache = require("../../assets/videos/dummyvid.mp4");
//   }
//   return videoSourceCache;
// };
const getVideoSource = () => null; // Disabled for testing

export const exercises = [
  {
    id: 1,
    name: "Lymphatic Hopping",
    description: "Gentle hopping to stimulate lymphatic flow",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 2,
    name: "Arm Swings",
    description: "Forward and backward arm swings for shoulder mobility",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 3,
    name: "Trunk Twists",
    description: "Rotational movements to improve spinal flexibility",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 4,
    name: "Body Waves",
    description: "Flowing wave-like movements through the body",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 5,
    name: "Spinal Twists",
    description: "Deep spinal rotation exercises",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 6,
    name: "Underarm Tapping",
    description: "Tapping movements under the arms for lymphatic stimulation",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 7,
    name: "Marches",
    description: "Marching in place for coordination and circulation",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 8,
    name: "Horse Stance Swings 100",
    description: "100 swings in horse stance position",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 9,
    name: "Knee Lifts with Downward Press",
    description: "Knee lifts combined with downward pressing motion",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 10,
    name: "Waist Arm Movement",
    description: "Circular arm movements while rotating the waist",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
  {
    id: 11,
    name: "Lunges with Press",
    description: "Lunging movements with pressing arm motions",
    image: placeholderImage,
    getVideo: getVideoSource,
  },
];

