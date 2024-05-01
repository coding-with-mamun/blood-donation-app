import { Link, useLocation } from "react-router-dom";
import { genaratePageTitile } from "../../helpers/Helper";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  // hide Breadcrumb usign pathnane
  const breadcrumbArea = ["/login", "/register", "/"];

  if (!breadcrumbArea.includes(pathname)) {
    return (
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title text-capitalize">
                  {genaratePageTitile(pathname)}
                </h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      {genaratePageTitile(pathname)}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
      </>
    );
  }
};

export default Breadcrumb;
