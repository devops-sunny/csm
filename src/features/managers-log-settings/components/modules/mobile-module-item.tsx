'use client';

import type { FunctionComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import { Draggable } from 'react-beautiful-dnd';

import { mobileAddEditModuleAtom } from '@features/managers-log-settings/states/common';
import { mobileDeleteModuleIdModalAtom } from '@features/managers-log-settings/states/modals-drawers';
import { getDisplayAllowedType } from '@features/managers-log-settings/utils/get-display-allowed-type';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiType } from '@shared/types/utils/api';

export type MobileModuleItemProps = {
  sx?: SxProps<Theme>;
  index: number;
  module: ApiType['Module'];
};

export const MobileModuleItem: FunctionComponent<MobileModuleItemProps> = ({
  index,
  module,
  sx,
}) => {
  const theme = useTheme();

  const { id, headerTitle, allowedTypes } = module;

  const allowedTypeText = allowedTypes
    .map((type) => getDisplayAllowedType(type))
    .join(' / ');

  return (
    <Draggable
      draggableId={id.toString()}
      index={index}
    >
      {(provided) => (
        <Accordion
          sx={{
            display: 'none',
            borderRadius: 1,
            mb: 1.5,
            [theme.breakpoints.down('md')]: {
              display: 'block',
            },
            ...sx,
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <AccordionSummary
            sx={{
              '.MuiAccordionSummary-content': {
                my: 1.25,
                alignItems: 'center',
                gap: 2,
              },
            }}
          >
            <Typography
              fontWeight={500}
              fontSize={14}
              pr={1}
            >
              {headerTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderTop: '1px solid',
              borderColor: theme.palette.catskillWhite,
              mx: 2,
              p: 0,
              pt: 3.5,
              pb: 2,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 3,
                alignItems: 'center',
              }}
            >
              <Box sx={{ gridColumn: '1 / span 2' }}>
                <Typography
                  component="span"
                  variant="body2"
                  fontWeight={500}
                  sx={{ fontSize: 11 }}
                >
                  Allowed Types
                </Typography>
                <Typography>{allowedTypeText}</Typography>
              </Box>
              <Button
                variant="link"
                onClick={() => {
                  defaultStore.set(mobileAddEditModuleAtom, module);
                }}
                sx={{
                  gridColumnStart: 1,
                  color: theme.palette.shark,
                }}
              >
                Edit Module
              </Button>
              <Button
                variant="link"
                sx={{
                  color: theme.palette.salmonPearl,
                  ml: 'auto',
                }}
                onClick={() => {
                  defaultStore.set(mobileDeleteModuleIdModalAtom, id);
                }}
              >
                Delete Module
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Draggable>
  );
};
