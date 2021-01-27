import Link from "next/link";

const NotificationPage = () => {
  return (
    <div className="container">
      <h3>You got to this page by clicking on notification. :)</h3>
      <Link href="/" passHref>
        <a className="button">Go to homepage</a>
      </Link>
    </div>
  );
};

export default NotificationPage;
