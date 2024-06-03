import toast from "react-hot-toast";

export const BaseURL = 'https://moviessite-1.onrender.com';

export const message = (str) => {
  toast(str,
    {
      style: {
        borderRadius: '10px',
        background: 'black',
        color: '#fff',
        border:"2px",
        borderStyle:"solid",
        borderColor:'gray'
      },
    }
  );
}

export const tempMovies = [
  {
    title: "Panchayat",
    year: "2020–",
    rating: "8.9",
    plot: "A comedy-drama, which captures the journey of an engineering graduate Abhishek, who for lack of a better job option joins as secretary of a Panchayat office in a remote village of Uttar Pradesh.",
    img: "https://m.media-amazon.com/images/M/MV5BOGRmMjc4MjEtM2E4YS00NjM5LWIwYzUtYTFlNTdhMTRhNmJjXkEyXkFqcGdeQXVyMTExMTIzMTA5._V1_SX300.jpg"
  },
  {
    title: "Mirzapur",
    year: "2018–",
    rating: "8.5",
    plot: "A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.",
    img: "https://m.media-amazon.com/images/M/MV5BN2NlNGYwYTUtMTczMi00NGVjLTgwMzUtNjBkZjIyNDc2NjcxXkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_SX300.jpg"
  },
  {
    title: "Gullak",
    year: "2019–",
    rating: "9.1",
    plot: "Set in quaint by-lanes in the heart of India, Gullak is a collection of disarming and relatable tales of the Mishra family.",
    img: "https://m.media-amazon.com/images/M/MV5BN2QwZmNhZjctZDZkMi00Mjk2LTg4OWMtNGEzMjk1ZWIwN2IzXkEyXkFqcGdeQXVyNDY4NjAxNTc@._V1_SX300.jpg"
  },
  {
    title: "Titanic",
    year: "1997",
    rating: "7.9",
    plot: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    img: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
  },
  {
    title: "Qismat",
    year: "2018",
    rating: "8.1",
    plot: "A man falls in love whilst studying in Chandigarh, despite his marriage being arranged to another woman.",
    img: "https://m.media-amazon.com/images/M/MV5BZTAxZDgxNWYtNWNjZC00NDM4LWI0OTEtY2Q4OGQxMmMyYmJiXkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_SX300.jpg"
  }
];
