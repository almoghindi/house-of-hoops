import React from "react";
import { Link } from "react-router-dom";

const Article = (props) => {
  const article = props.article;
  return (
    <>
      <div style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
        <div className="container position-relative">
          <article className="z-index-1 position-relative">
            <header className="py-7">
              <Link rel="noopener noreferrer" to={`/`}>
                <p
                  style={{ cursor: "pointer" }}
                  className="btn-arrow-left fw-700 text-decoration-none mb-5 d-inline-block text-primary"
                >
                  All posts
                </p>
              </Link>
              <h1 className="headline">{article.mainTitle}</h1>
              <h2 className="subhead w-70 mb-6">{article.secondTitle}</h2>
              <p className="article-tags">
                <span className="tag rounded-pill me-2 fw-700 bg-primary text-white shadow-lg py-2 px-3 small featured">
                  {article.firstTag}
                </span>
                <span className="tag rounded-pill me-2 fw-700 bg-white shadow-lg py-2 px-3 small">
                  {article.secondTag}
                </span>
                <span className="tag rounded-pill me-2 fw-700 bg-white shadow-lg py-2 px-3 small">
                  {article.thirdTag}
                </span>
              </p>
            </header>

            <div className="article-meta d-flex justify-content-between mb-6">
              <div id="author" className="center-v">
                <svg
                  id="author-avatar"
                  className="me-3"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                >
                  <title id="avatarTitle">Author Avatar</title>
                  <desc id="avatarDesc">
                    A cartoon avatar of a smiling purple square on a blue
                    background.
                  </desc>
                  <mask
                    id="mask__beam"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                  >
                    <rect width="36" height="36" rx="72" fill="white"></rect>
                  </mask>
                  <g mask="url(#mask__beam)">
                    <rect width="36" height="36" fill="#0ebeff"></rect>
                    <rect
                      x="0"
                      y="0"
                      width="36"
                      height="36"
                      transform="translate(6 6) rotate(192 18 18) scale(1)"
                      fill="#754cac"
                      rx="6"
                    ></rect>
                    <g transform="translate(0 2) rotate(-2 18 18)">
                      <path d="M13,19 a1,0.75 0 0,0 10,0" fill="white"></path>
                      <rect
                        x="12"
                        y="14"
                        width="1.5"
                        height="2"
                        rx="1"
                        stroke="none"
                        fill="white"
                      ></rect>
                      <rect
                        x="22"
                        y="14"
                        width="1.5"
                        height="2"
                        rx="1"
                        stroke="none"
                        fill="white"
                      ></rect>
                    </g>
                  </g>
                </svg>
                <p className="byline fw-700 mb-0">by {article.author}</p>
              </div>

              <p className="dateline mb-0 fw-700">{article.date}</p>
            </div>

            <main>
              <section className="mb-7">
                <div className="row">
                  <div className="col-md-8">
                    <p className="lead mb-6 pb-3">{article.firstDescription}</p>
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-md-3 text-body">
                  <div className="col">
                    <p>{article.firstP}</p>

                    <p>{article.secondP}</p>

                    <p>{article.thirdP}</p>

                    <aside className="border-start border-3 p-4 fw-700">
                      <p>"{article.quote}"</p>
                    </aside>

                    <p>{article.fourthP}</p>
                  </div>

                  <div className="col">
                    <p>{article.fifthP}</p>

                    <p>{article.sixthP}</p>
                  </div>

                  <div className="col">
                    <figure>
                      <img
                        className="img-fluid"
                        src={article.firstImg}
                        alt="a smiling person in a pink hoodie, standing in front of a bright pink lighted arcade basketball game. "
                      />
                      <figcaption className="small text-muted mt-2">
                        Photo by {article.firstPhotoBy}
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </section>

              <section
                className="mb-7"
                data-tor-group="
            [class*='col'] => inview:[fade.in pull.up(md)] slower quad delay(/+50ms/);
            img => scroll:@T=translate(-99.99%; 0%, {end: 50});
          "
              >
                <h2 className="mb-6">{article.thirdTitle}</h2>

                <div className="row">
                  <div className="col-md-8">
                    <p className="lead mb-6 pb-3">
                      {article.secondDescription}
                    </p>
                  </div>
                </div>

                <div className="row text-body">
                  <div className="col-md-8">
                    <figure className="overflow-hidden">
                      <img
                        className="img-fluid"
                        style={{ width: "700px" }}
                        src={article.secondImg}
                        alt="two people playing Guitar Hero Arcade. "
                      />
                      <figcaption className="small text-muted mt-2">
                        Photo by {article.secondPhotoBy}
                      </figcaption>
                    </figure>
                  </div>

                  <div className="col-md-4">
                    <p>{article.seventhP}</p>
                    <p>{article.eigthP}</p>
                    <p>{article.ninthP}</p>
                  </div>
                </div>
              </section>

              <section
                className="mb-7"
                data-tor-group="
            [class*='col'] => inview:[fade.in pull.up(md)] slower quad delay(/+50ms/);
            img => scroll:@T=scale(80%;100%);
          "
              >
                <h2 className="mb-6">{article.fourthTitle}</h2>

                <div className="row">
                  <div className="col-md-8">
                    <p className="lead mb-6 pb-3">{article.thirdDescription}</p>

                    <div className="row text-body">
                      <div className="col-md-6">
                        <p>{article.tenthP}</p>
                        <p>{article.eleventhP}</p>
                        <p>{article.twelvethP}</p>
                      </div>
                      <div className="col-md-6">
                        <p>{article.thirteenP}</p>
                        <p>{article.fourteenP}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <figure>
                      <img
                        className="img-fluid"
                        src={article.thirdImg}
                        style={{ width: "500px" }}
                        alt="a person wearing a bucket hat, sitting on a skee ball machine lane. "
                      />
                      <figcaption className="small text-muted mt-2">
                        Photo by {article.thirdPhotoBy}
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </section>

              <section className="mb-7">
                <div className="row g-0">
                  <div className="col">
                    <figure className="overflow-hidden">
                      <img
                        data-tor="scroll:@T=translateX(50%;0%)"
                        className="img-fluid"
                        style={{ width: "600px" }}
                        src={article.fourthImg}
                        alt="a person in black high-heeled boots sitting on an arcade basketball game. "
                      />
                      <figcaption className="small text-muted mt-2">
                        Photo by {article.fourthPhotoBy}
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col">
                    <figure className="overflow-hidden">
                      <img
                        data-tor="scroll:@T=translateX(-50%;0%)"
                        className="img-fluid"
                        style={{ width: "600px", height: "400px" }}
                        src={article.fifthImg}
                        alt="a person in a white t-shirt sitting on a wheel of fortune arcade game. "
                      />
                      <figcaption className="small text-muted mt-2">
                        Photo by {article.fifthPhotoBy}
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </section>

              <section
                data-tor-group="
            [class*='col'] => inview:[fade.in pull.up(md)] slower quad delay(/+50ms/);
          "
              >
                <h2 className="mb-6">{article.fifthTitle}</h2>

                <div className="row">
                  <div className="col-md-8">
                    <p className="lead mb-6 pb-3">
                      {article.fourthDescription}
                    </p>
                  </div>
                </div>

                <div className="row mb-7">
                  <div className="col-md-4">
                    <p>{article.fifteenP}</p>
                    <p>{article.sixteenP}</p>
                    <p>{article.seventeenP}</p>
                  </div>

                  <div className="col-md-4">
                    <p>{article.eighteenP}</p>
                    <aside className="border-start border-3 p-4 fw-700">
                      <p>{article.secondQuote}</p>
                    </aside>
                    <p>{article.ninteenP}</p>
                  </div>

                  <div className="col-md-4">
                    <p>{article.twentyP}</p>
                    <p>{article.twentyOneP}</p>
                  </div>
                </div>

                <div className="h-50rem">
                  <figure>
                    <img
                      className="w-100"
                      src={article.sixthImg}
                      alt="three neon-lit skee ball lanes. "
                      data-tor="scroll:@T=scale(2;1, {end: 60}) origin.top"
                    />
                    <figcaption>{article.sixthPhotoBy}</figcaption>
                  </figure>
                </div>
              </section>
            </main>
          </article>

          <div className="bg">
            <div className="container h-100">
              <div className="row row-cols-3 h-100">
                <div className="col">
                  <div className="border-start border-end h-100"></div>
                </div>
                <div className="col">
                  <div className="border-start border-end h-100"></div>
                </div>
                <div className="col">
                  <div className="border-start border-end h-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="position-fixed bottom-0 end-0 m-4 z-index-master">
        <a
          href="https://toruskit.com"
          className="d-inline-block strong text-white text-decoration-none bg-black bg-opacity-80 p-3 btn-arrow"
        >
          Made by{" "}
          <strong className="text-decoration-underline">Almog Hindi</strong>
        </a>
      </div>
    </>
  );
};
export default Article;
