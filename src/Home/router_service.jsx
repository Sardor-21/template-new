//main
import Home from "./Home_/index";
import Mentor from "./Mentor";
import Mentee from "./Mentee";
import Pages from "./Pages";
import Blog from "./Blog";
import About from "./About/about";
import ReviewsGeneral from "./rewiseall/rewise";
import Oferta from "./oferta/oferta";
export default [
  {
    path: "home",
    component: Home,
  },
  {
    path: "oferta",
    component: Oferta,
  },
  {
    path: "mentor",
    component: Mentor,
  },
  {
    path: "mentee",
    component: Mentee,
  },
  {
    path: "pages",
    component: Pages,
  },
  {
    path: "blog",
    component: Blog,
  },
  {
    path: "about",
    component: About,
  },
  {
    path: "reviwes-all",
    component: ReviewsGeneral,
  },

];
