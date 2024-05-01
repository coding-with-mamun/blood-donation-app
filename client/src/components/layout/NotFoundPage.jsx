import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      {/* Error 404 */}
      <section className="error-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12 text-center">
              <div className="error-info">
                <div className="error-404-img">
                  <img
                    src="assets/img/error-404.png"
                    className="img-fluid"
                    alt="error-404-image"
                  />
                  <div
                    className="error-content error-404-content"
                    style={{ position: "static" }}
                  >
                    <h2>Oops! That Page Can’t Be Found.</h2>
                    <p>The page you are looking for was never existed.</p>
                    <Link to="/" className="btn btn-primary prime-btn">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Error 404 */}
    </>
  );
};

export default NotFoundPage;
