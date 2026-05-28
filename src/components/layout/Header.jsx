import MediaButtons from "../shared/MediaButtons";
import Logo from "../shared/Logo";
import Nav from "../shared/Nav";

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="header-container">
                    <div className="logo-wrap">
                        <Logo />
                    </div>
                    <div className="menu-wrap">
                        <Nav />
                    </div>
                    <div className="media-wrap">
                        <MediaButtons />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;