import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import NavTabs from "./views/NavTabs";
export interface HomePageProps {}
const HomePage = () => {
  const data = [
    {
      title: "Barbarian",
      img: "https://img.xmovies8.fun/xxrz/250x400/100/0a/b0/0ab08224c226dd6b284144f1b91dac79/0ab08224c226dd6b284144f1b91dac79.jpg",
    },
    {
      title: "The Good Nurse",
      img: "https://img.xmovies8.fun/xxrz/250x400/100/05/b1/05b1a5e0065bce54d68733aa58d5d587/05b1a5e0065bce54d68733aa58d5d587.jpg",
    },
    {
      title: "Black Adam",
      img: "https://img.xmovies8.fun/xxrz/250x400/100/15/1b/151b961f5343bebb7f434f3060079d97/151b961f5343bebb7f434f3060079d97.jpg",
    },
    {
      title: "Ticket to Paradise",
      img: "https://img.xmovies8.fun/xxrz/250x400/100/67/ac/67ac74056498ef750f26f63330e48566/67ac74056498ef750f26f63330e48566.jpg",
    },
    {
      title: "Robbing Mussolini",
      img: "https://img.xmovies8.fun/xxrz/250x400/100/7f/57/7f57310a2b3e74f1c1333cabadc80cd0/7f57310a2b3e74f1c1333cabadc80cd0.jpg",
    },
    {
      title: "Orphan: First Kill",
      img: "https://img.xmovies8.fun/xxrz/250x400/100/1e/b9/1eb90ac57a535458f649c16495f117ad/1eb90ac57a535458f649c16495f117ad.jpg",
    },
    {
      title: "Terrifier 2",
      img: "https://img.xmovies8.fun/xxrz/250x400/100/92/19/921937f860ce4ff635afa632383da2bd/921937f860ce4ff635afa632383da2bd.jpg",
    },
    {
      title: "The Chalk Line",
      img: "https://img.xmovies8.fun/xxrz/250x400/100/62/79/6279ab30d40f642a1174848ea3d5941b/6279ab30d40f642a1174848ea3d5941b.jpg",
    },
  ];
  return (
    <section>
      <NavTabs />
      <div className="section">
        <span className="title text-center">
          Find Movies, TV shows and more
        </span>
        <div className="search-div">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="search-input input-lg"
                placeholder="Enter keywords ..."
              />
            </div>
            <div className="col-1">
              <button className="circle-button">
                <FontAwesomeIcon icon={faArrowRight} size="xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="row">
          {[...Array(data.length)].map((_, i) => {
            return (
              <div className="container" key={i}>
                <div className="img-container text-center">
                  <img className="img" alt="Avatar" src={data[i].img} />
                  <div className="overlay">
                    <button className="circle-button play-btn">
                      <FontAwesomeIcon icon={faPlay} size="xl" />
                    </button>
                  </div>
                </div>
                <div className="sub-container">
                  <div className="title-1">{data[i].title}</div>
                  <div className="sub-title">2022</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
