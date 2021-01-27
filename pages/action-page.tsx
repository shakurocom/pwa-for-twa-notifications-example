import { useRouter } from "next/router";
import Link from "next/link";

const ActionPage = () => {
  const { query } = useRouter();
  return (
    <div className="container">
      <h3>You got to this page by clicking on action. :)</h3>
      <p>Your payload: {query.payload}</p>
      <Link href="/" passHref>
        <a className="button">Go to homepage</a>
      </Link>
    </div>
  );
};

export default ActionPage;
