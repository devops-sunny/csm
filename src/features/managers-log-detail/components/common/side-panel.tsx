'use client';

import { useEffect, useRef, type FunctionComponent } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import { useAtomValue } from 'jotai';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import { useRequestLogEntries } from '@features/managers-log-detail/hooks/api/use-request-log-entries';
import { useHasFilledAllSettings } from '@features/managers-log-detail/hooks/use-has-filled-all-settings';
import { activeModuleAtom } from '@features/managers-log-detail/states/common';
import { fillingSettingWarnModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { AppRoute } from '@shared/constants/app-route';
import { MODULE_ID_PREFIX } from '@shared/constants/managers-log';
import { defaultStore } from '@shared/libs/jotai/default-store';

export type SidePanelProps = {
  sx?: SxProps<Theme>;
};

export const SidePanel: FunctionComponent<SidePanelProps> = ({ sx }) => {
  const theme = useTheme();

  const router = useRouter();

  const activeModule = useAtomValue(activeModuleAtom);

  const containerRef = useRef<HTMLDivElement>();

  const { data: logEntryResponse, isValidating: logEntryLoading } =
    useRequestLogEntries();

  const hasFilledSettings = useHasFilledAllSettings();

  useEffect(() => {
    const { hash } = window.location;

    if (!logEntryResponse?.data.modules) return;

    if (hash) {
      const moduleId = hash.replace(`#${MODULE_ID_PREFIX}`, '');

      if (moduleId !== activeModule?.toString()) {
        defaultStore.set(activeModuleAtom, {
          id: Number(moduleId),
          activeBy: 'click',
        });

        const containerElement = containerRef.current;

        const activeMenuElement = containerElement?.querySelector(
          `a[data-module-id="${moduleId}"]`,
        ) as HTMLElement | null;

        activeMenuElement?.click();
      }
    } else {
      const { modules } = logEntryResponse.data;

      if (modules.length > 0 && activeModule === null) {
        defaultStore.set(activeModuleAtom, {
          id: modules[0].id,
          activeBy: 'click',
        });
      }
    }
    // should only work in the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logEntryResponse?.data.modules]);

  const handleBackToList = () => {
    if (hasFilledSettings) {
      router.push(AppRoute.ManagersLog);
    } else {
      defaultStore.set(fillingSettingWarnModalAtom, true);
    }
  };

  const modules = logEntryResponse?.data.modules ?? [];

  const orderedModules = modules.sort((a, b) => a.order - b.order);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        maxWidth: 250,
        minWidth: 200,
        width: '20%',
        height: 1,
        display: 'flex',
        justifySelf: 'stretch',
        flexFlow: 'column',
        overflowY: 'auto',
        backgroundColor: theme.palette.oxfordBlue,
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
        ...sx,
      }}
    >
      <Button
        variant="link"
        onClick={handleBackToList}
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 2,
          '&:hover': {
            textDecoration: 'none',
          },
        }}
      >
        <ArrowBack sx={{ mr: 1.25, color: theme.palette.azure }} />
        <Typography
          sx={{
            color: theme.palette.white,
            fontWeight: 500,
          }}
        >
          Back to the list
        </Typography>
      </Button>
      <Divider sx={{ mb: 3 }} />
      {logEntryLoading && <LoadingIndicator />}
      {!logEntryLoading &&
        orderedModules.map((module) => {
          const isActive = activeModule?.id === module.id;

          return (
            <Button
              key={module.id}
              data-module-id={module.id}
              LinkComponent={NextLink}
              href={`#${MODULE_ID_PREFIX}${module.id}`}
              onClick={() =>
                defaultStore.set(activeModuleAtom, {
                  activeBy: 'click',
                  id: module.id,
                })
              }
              variant="text"
              sx={{
                width: 1,
                justifyContent: 'start',
                height: 37,
                py: 3.25,
                ...(isActive && {
                  color: theme.palette.blueberry,
                  '.active-indicator': {
                    backgroundColor: theme.palette.blueberry,
                  },
                  '.menu-title': {
                    color: theme.palette.blueberry,
                    fontWeight: 500,
                  },
                }),
                '&:hover': {
                  color: theme.palette.blueberry,
                  '.active-indicator': {
                    backgroundColor: theme.palette.blueberry,
                  },
                  '.menu-title': {
                    color: theme.palette.blueberry,
                    fontWeight: 500,
                  },
                },
              }}
            >
              <Box
                component="span"
                className="active-indicator"
                sx={{
                  height: 37,
                  width: 3,
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.3s',
                  borderRadius: 20,
                  mr: 2,
                }}
              />
              <Typography
                className="menu-title"
                sx={{
                  textWrap: 'nowrap',
                  color: theme.palette.blackCoralPearl,
                }}
              >
                {module.headerTitle}
              </Typography>
            </Button>
          );
        })}
    </Box>
  );
};
