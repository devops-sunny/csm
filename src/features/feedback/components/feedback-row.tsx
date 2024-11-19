import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Box, Collapse, IconButton, SvgIcon, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

import ChevronLeftIcon from '@assets/icons/common/chevron-left.svg';
import { US_SHORT_DATE_FORMAT } from '@shared/constants/common';
import { FeedbackType } from '@shared/types/api/generated';
import type { ApiType } from '@shared/types/utils/api';

const COLLAPSED_HEIGHT = 60;

export type FeedbackRowProps = {
  feedback: ApiType['FeedbackResponse'];
};

export const FeedbackRow: FunctionComponent<FeedbackRowProps> = ({
  feedback,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showExpandArrow, setShowExpandArrow] = useState(false);

  const messageRef = useRef<HTMLElement>(null);

  const theme = useTheme();

  const { feedbackType, createdAt, message } = feedback;

  useEffect(() => {
    const scrollHeight = messageRef.current?.clientHeight;

    if (scrollHeight && scrollHeight > COLLAPSED_HEIGHT) {
      setShowExpandArrow(true);
    }
  }, []);

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: '1px solid',
        borderColor: theme.palette.catskillWhite,
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
          p: 2.5,
        },
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Typography
          fontWeight={500}
          sx={{
            [theme.breakpoints.down('md')]: {
              fontSize: 14,
            },
          }}
        >
          {feedbackType === FeedbackType.App ? 'App' : 'Work'} Feedback
        </Typography>
        <Typography
          fontSize={10}
          sx={{
            [theme.breakpoints.down('md')]: {
              fontSize: 12,
            },
          }}
        >
          {dayjs(createdAt).format(US_SHORT_DATE_FORMAT)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          overflow: 'hidden',
        }}
      >
        <Collapse
          collapsedSize={COLLAPSED_HEIGHT}
          in={expanded}
        >
          <Typography
            ref={messageRef}
            sx={{
              wordBreak: 'break-word',
              [theme.breakpoints.down('md')]: {
                fontSize: 14,
              },
            }}
          >
            {message}
          </Typography>
        </Collapse>
        {showExpandArrow && (
          <IconButton
            size="icon-only"
            sx={{
              color: theme.palette.azure,
              transition: 'transform 0.2s',
              transform: 'rotate(180deg)',
              borderRadius: '50%',
              ...(expanded && {
                transform: 'rotate(270deg)',
                color: theme.palette.white,
                backgroundColor: theme.palette.blueberry,

                '&:hover': {
                  backgroundColor: theme.palette.blueberry,
                  color: theme.palette.white,
                },
              }),
              [theme.breakpoints.up('md')]: {
                '&:hover': {
                  backgroundColor: theme.palette.blueberry,
                  color: theme.palette.white,
                },
              },
            }}
          >
            <SvgIcon sx={{ fontSize: 14 }}>
              <ChevronLeftIcon />
            </SvgIcon>
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
