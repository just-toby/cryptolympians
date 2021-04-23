import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export type HeaderLinkProps = {
  title: string;
  href: string;
};

export function HeaderLink(props: HeaderLinkProps) {
  const router = useRouter();
  return (
    <Link href={props.href} passHref>
      <ChakraLink
        href={props.href}
        color="white"
        fontSize="lg"
        textDecoration={router.pathname === props.href ? "underline" : null}
        marginRight="4rem"
      >
        {props.title}
      </ChakraLink>
    </Link>
  );
}
