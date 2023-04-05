import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, ButtonBase, SvgIcon } from "@mui/material";
import { useEffect, useState } from "react";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export const SideNavItem = (props) => {
  const [mount, setMount] = useState(false);
  const {
    active = false,
    disabled,
    external,
    icon,
    path,
    title,
    subMenuInfo,
    subMenu,
    subActive,
  } = props;

  console.log(subMenuInfo);
  const onClick = () => {
    if (subMenu) {
      setMount((mount) => !mount); // on,off 개념 boolean
    }
  };

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: "6px",
          textAlign: "left",
          width: "100%",
          ...(active && {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }),
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        }}
        {...(!subMenu && { ...linkProps })}
        onClick={onClick}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "neutral.400",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              ...(active && {
                color: "primary.main",
              }),
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: "neutral.400",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(active && {
              color: "common.white",
            }),
            ...(disabled && {
              color: "neutral.500",
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>

      {mount && (
        <>
          {subMenuInfo.map((info) => (
            <ButtonBase
              key={info.subTitle}
              href={info.subPath}
              component={NextLink}
              sx={{
                alignItems: "center",
                borderRadius: 1,
                display: "flex",
                justifyContent: "flex-start",

                pl: "16px",
                pr: "16px",
                py: "6px",
                textAlign: "left",
                width: "100%",

                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                },
              }}

              // {...linkProps}
            >
              <Box sx={{ width: "17%" }}>
                <SvgIcon
                  fontSize="small"
                  sx={{
                    ...(subActive && {
                      color: "primary.main",
                    }),
                    pt: 0.5,
                    pl: 1,
                  }}
                >
                  <FiberManualRecordIcon />
                </SvgIcon>
              </Box>
              <Box
                component="span"
                sx={{
                  color: "neutral.400",
                  flexGrow: 1,
                  fontFamily: (theme) => theme.typography.fontFamily,
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "24px",
                  // whiteSpace: "nowrap",
                  textAlign: "left",
                  ...(subActive && {
                    color: "common.white",
                  }),
                  ...(disabled && {
                    color: "neutral.500",
                  }),
                  width: "70%",
                }}
              >
                {info.subTitle}
              </Box>
            </ButtonBase>
          ))}
        </>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
