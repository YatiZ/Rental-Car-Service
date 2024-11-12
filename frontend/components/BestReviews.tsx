import React from "react";

const BestReviews = () => {
  return (
    <div className="m-8">
      <h2 className="text-[30px] font-bold text-center">
        Our beloved customers' reviews
      </h2>

      <div className="card-columns border border-blue-600 rounded-md h-[650px] p-5 overflow-x-auto">
        <div className="card text-white border-0">
          <div className="card-img-overlay --card-img-overlay-purple d-flex flex-column justify-between items-center p-5">
            <div className="h2 mb-2">
              <a
                className="text-white text-decoration-none"
                href="javascript://"
              >
                Web Design Trends
              </a>
            </div>
            <span className="w-fit border text-uppercase">January 2023</span>
          </div>
        </div>

        <div className="card border-0">
          <div className="position-relative text-white">
            <div className="card-img-overlay three">
              <span className="badge badge-light text-uppercase">Famous</span>
            </div>

            <div className="card-smooth-caption">
              <div className="d-flex justify-content-between align-items-center">
                <div className="mr-auto">
                  <h5 className="card-title text-white">Smooth caption</h5>
                  <h6 className="card-subtitle text-white">
                    Alternative caption
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <p className="card-text">
              {" "}
              Minim dolor in amet nulla laboris enim dolore consequat proident
              fugiat culpa eiusmod proident sed excepteur excepteur magna irure
              ex officia ea sunt in incididunt.
            </p>
          </div>

          <div className="card-footer">
            <div className="media align-items-center">
              <div className="media-body">
                <a
                  className="card-link text-primary read-more"
                  href="javascript://"
                >
                  Read More
                </a>
              </div>
              <div className="footerright">
                <div className="tnlink3">
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </div>
                <div className="tnlink3">
                  <i className="fas fa-share-nodes" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card text-white border-0">
          <div className="card-img-overlay --card-img-overlay-purple d-flex flex-column justify-content-between align-items-start p-5 four"></div>

          <div className="card-img-overlay card-overlay-black hover-light d-flex flex-column justify-content-between align-items-start">
            <div className="d-flex justify-content-between w-100 mb-3">
              <div>
                <span className="badge badge-warning3 mr-2"> TRENDS</span>
                <span className="badge badge-info"> DESIGN</span>
              </div>

              <a href="javascript://">
                <div className="myicoo"></div>
              </a>
            </div>
            <div className="mb-4">
              <div className="h3">
                <a
                  className="text-white text-decoration-none"
                  href="javascript://"
                >
                  Web Design templates
                  <br />
                  Selection
                </a>
              </div>
            </div>
            <div className="text-light">January 14 2023</div>
          </div>
        </div>

        <div className="card text-center border-0">
          <div className="card-body">
            <div className="card-card-avatar mb-4">
              <div className="card-avatar avatar-border two"></div>
            </div>
            <div className="mb-5">
              <h5 className="card-title mb-1">Hannah Luebbering</h5>
              <div className="text-muted">Applied Mathematics</div>
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <a className="card-link text-uppercase" href="javascript://">
                Accept
              </a>
              <a
                className="card-link text-uppercase text-dark"
                href="javascript://"
              >
                Denied
              </a>
            </div>
          </div>
        </div>

        <div className="card bg-primary text-white text-center p-4 border-0 two">
          <blockquote className="blockquote mb-0">
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat.
            </p>
            <footer className="blockquote-footer text-white">
              <small>
                Someone famous in
                <cite title="Source Title"> Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </div>

        <div className="card text-center border-0 mb-4">
          <div className="card-cup bg-primary"></div>
          <div className="card-body proavatar">
            <div className="card-avatar avatar-border mt-n5">
              <rect width="100%" height="100%" fill="#495057"></rect>
            </div>
            <h5 className="card-title text-primary mb-1">Hannah Luebbering</h5>
            <div className="text-muted">Data Science</div>

            <p className="mt-4 mb-3">
              Minim dolor in amet nulla laboris enim dolore consequat proident
              fugiat culpa eiusmod proiden
            </p>
          </div>
          <div className="card-footer card-footer two">
            <a
              className="card-link text-primary read-more two"
              href="javascript://"
            >
              Follow
            </a>
          </div>
        </div>

        <div className="card bg-primary text-white text-center p-4 border-0">
          <blockquote className="blockquote mb-0">
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat.
            </p>
            <footer className="blockquote-footer text-white">
              <small>
                Someone famous in
                <cite title="Source Title"> Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </div>

        <div className="card bg-secondary two text-white p-4 border-0">
          <hr />

          <div className="container incard">
            <h2 className="indent">Inset Heading</h2>
            <p className="indent">
              {" "}
              Minim dolor in amet nulla laboris enim dolore consequat proident
              fugiat culpa eiusmod proident sed excepteur excepteur magna.{" "}
            </p>
          </div>
        </div>

        <div className="card border-0 three">
          <div className="position-relative">
            <div className="card-img-overlay two">
              <span className="badge badge-light text-uppercase">FASHION</span>
            </div>
          </div>
          <div className="card-body two">
            <h5 className="card-title">Fashion today</h5>
            <h6 className="card-subtitle mb-2 text-muted">January 16 2023</h6>
            <hr />
            <p className="card-text mt-4">
              Minim dolor in amet nulla laboris enim dolore consequat proident
              fugiat culpa eiusmod proident sed excepteur excepteur magna irure
              ex officia ea sunt in incididunt.
            </p>
          </div>
          <div className="card-footer">
            <div className="media align-items-center">
              <div className="media-body">
                <a
                  className="card-link text-primary read-more"
                  href="javascript://"
                >
                  Read More
                </a>
              </div>

              <div className="footerright">
                <div className="tnlink3">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="tnlink3">
                  <i className="fas fa-share-nodes"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestReviews;
