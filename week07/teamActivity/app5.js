import Hikes from './hikes.js';
import Comments from './comments.js';

//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
const comments = new Comments("comments", "hikes");
window.addEventListener('load', () => {
  myHikes.showHikeList();
  comments.showAllComments();
  // comments.showOneComment("Test Hike")
});
