import React from "react";
import { Link, useStaticQuery, graphql, withPrefix } from "gatsby";
import { useLocation } from "@reach/router";
import { IconButton, useTheme, Stack, Flex } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { Logo } from "../Logo";
import { NavSocial, NavPreviousYears, NavLink } from "./";

export const Nav = ({
  breakpoint,
  isOpen,
  onNavClose = () => {},
  ...props
}) => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const data = useStaticQuery(graphql`
    query NavPagesQuery {
      site {
        siteMetadata {
          currentYear
        }
      }
    }
  `);

  const currentYear = data.site.siteMetadata.currentYear;

  return (
    <Flex
      direction="column"
      alignItems={{ [breakpoint]: "flex-end" }}
      background={theme.gradients.brand}
      color="white"
      position="fixed"
      top="0"
      left="0"
      bottom="0"
      transform={{
        base: `translate(${isOpen ? 0 : "100%"})`,
        [breakpoint]: "none",
      }}
      transition={{ base: "transform 0.4s", [breakpoint]: "none" }}
      overflowY="auto"
      overflowX="none"
      zIndex="3"
      as="nav"
      {...props}
    >
      <Flex direction="column" flexGrow={1}>
        <IconButton
          variant="unstyled"
          aria-label="Menu"
          display={{ base: "inline-flex", [breakpoint]: "none" }}
          icon={<FiX />}
          size="lg"
          position="absolute"
          top="0"
          right="0"
          onClick={() => onNavClose()}
        />
        <Stack px="2">
          <Flex
            px="2"
            pt="4vh"
            pb="2vh"
            align="center"
            justify={{ base: "center", [breakpoint]: "flex-end" }}
          >
            <Link to={`/${currentYear}`}>
              <Logo w={{ base: "8rem", [breakpoint]: "12rem" }} />
            </Link>
          </Flex>
          <Stack>
            <NavLink isMain as={Link} to={`/${currentYear}`} fontWeight="bold">
              Édition {currentYear}
            </NavLink>
            {pathname.startsWith(withPrefix(`/${currentYear}`)) && (
              <>
                {/* <NavLink
                  as={Link}
                  to={`/${currentYear}/inscription`}
                  fontWeight="bold"
                >
                  Inscription
                </NavLink> */}
                <NavLink
                  as={Link}
                  to={`/${currentYear}/programme`}
                  fontWeight="bold"
                >
                  Programme
                </NavLink>
                <NavLink
                  as={Link}
                  to={`/${currentYear}/speakers`}
                  fontWeight="bold"
                >
                  Intervenants
                </NavLink>
                <NavLink
                  as={Link}
                  to={`/${currentYear}/sponsors`}
                  fontWeight="bold"
                >
                  Sponsors
                </NavLink>
                <NavLink
                  as={Link}
                  to={`/${currentYear}/organisateurs`}
                  fontWeight="bold"
                >
                  Organisateurs
                </NavLink>
                <NavLink
                  as={Link}
                  to={`/${currentYear}/kit-de-presse`}
                  fontWeight="bold"
                >
                  Kit de presse
                </NavLink>
                <NavLink
                  as={Link}
                  to={`/${currentYear}/code-of-conduct`}
                  fontWeight="bold"
                >
                  Code de conduite
                </NavLink>
                <NavLink
                  as={Link}
                  to={`/${currentYear}/review-2020-2021`}
                  fontWeight="bold"
                >
                  Review 2020-2021
                </NavLink>
              </>
            )}
          </Stack>
          <Stack spacing="0">
            <NavLink isMain as={Link} to="/meetups" fontWeight="bold">
              Meetups
            </NavLink>
            {pathname.startsWith(withPrefix("/meetups")) && (
              <>
                <NavLink as={Link} to="/meetups/sponsors" fontWeight="bold">
                  Sponsors
                </NavLink>
              </>
            )}
          </Stack>
          {/* <Stack>
            <NavLink isMain as={Link} to="/live" title="Live Twitch">
              Stream
            </NavLink>
          </Stack> */}
          <Stack>
            <NavLink
              isMain
              as={Link}
              to="/devoxx4kids"
              title="Devoxx4Kids"
              fontWeight="bold"
            >
              Devoxx4Kids
            </NavLink>
          </Stack>
        </Stack>
        <Stack mt="auto" p="4" mb="2">
          <NavSocial />
          <NavPreviousYears />
        </Stack>
      </Flex>
    </Flex>
  );
};
