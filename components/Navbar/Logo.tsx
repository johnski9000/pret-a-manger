import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  const logo = "/pret-a-manger-logo.png";
  const url = "/";
  return (
    <Link className="flex justify-center items-center" href={url}>
      <Image src={logo} alt="Pret A Manger Logo" width={70} height={20} />
    </Link>
  );
}

export default Logo;
