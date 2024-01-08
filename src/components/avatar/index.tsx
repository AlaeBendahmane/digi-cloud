import { useState } from "react";

interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
  user:
    | {
        firstName?: string;
        lastName?: string;
        avatar?: string;
      }
    | undefined;
}
function Avatar({ user, className }: AppProps) {
  const [error, setError] = useState(false);
  const FirstLetter = user?.firstName?.[0]?.toUpperCase() || "F";
  const SecondLetter = user?.lastName?.[0]?.toUpperCase() || "L";
  if (user?.avatar && !error)
    return (
      <img
        src={
          user.firstName
            ? `http://${window.location.hostname}/auth/${user?.avatar}`
            : `${user?.avatar}`
        }
        className={`aspect-square rounded-full ${className}`}
        onError={() => {
          setError(true);
        }}
      />
    );
  else
    return (
      <div
        className={`flex-center h-8 aspect-square bg-purple-500  text-white brightness-110 rounded-full  ${className}`}
      >
        <span>{FirstLetter}</span>
        <span>{SecondLetter}</span>
      </div>
    );
}

export default Avatar;
