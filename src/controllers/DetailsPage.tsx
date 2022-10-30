import NavTabs from "./views/NavTabs";

const DetailsPage = () => {
  return (
    <section>
      <NavTabs/>
      <div className="section">
        <div className="section-container dark">
          <div className="row">
            <div className="col-2 p-3">
              <img
                className="img-div"
                alt="Barbarian"
                src="https://img.xmovies8.fun/xxrz/250x400/100/0a/b0/0ab08224c226dd6b284144f1b91dac79/0ab08224c226dd6b284144f1b91dac79.jpg"
              />
              <div className="sub-container">
                <div className="sub-title">Star Review</div>
              </div>
            </div>
            <div className="col">
              <div className="title">Barbarian</div>
              <p className="sub-title-1">
                In town for a job interview, a young woman arrives at her Airbnb
                late at night only to find that it has been mistakenly
                double-booked and a strange man is already staying there.
                Against her better judgement, she decides to stay the night
                anyway, but soon discovers that there is much more to be afraid
                of in the house than the other house guest.
              </p>
              <div className="row">
                <div className="col-4">
                  <div className="sub-title-1 mt-3">
                    <b>Released</b>: 2022-09-08
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Casts</b>: Bill Skarsgård, Richard Brake, Kurt
                    Braunohler, Georgina Campbell, Kate Nichols, J.R. Esposito,
                    Jaymes Butler, Justin Long, Zach Cregger, Will Greenberg,
                    Kalina Stancheva, Matthew Patrick Davis, Kate Bosworth, Sara
                    Paxton, Derek Morse, Trevor Van Uden, Brooke Dillman, Rachel
                    Fowler, Sophie Sörensen, Julian Stanishkov, Devina Vassileva
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-container dark mt-3">
          <div className="title-1">Comments</div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
