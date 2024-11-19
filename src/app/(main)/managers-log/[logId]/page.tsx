'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

import { InfoAndFiltersBar } from '@features/managers-log-detail/components/common/info-and-filters-bar';
import { MobileFooterActions } from '@features/managers-log-detail/components/common/mobile-footer-actions';
import { ModuleSection } from '@features/managers-log-detail/components/common/module-section';
import { SettingFields } from '@features/managers-log-detail/components/common/setting-fields';
import { SidePanel } from '@features/managers-log-detail/components/common/side-panel';
import { CreateEditLogEntryModal } from '@features/managers-log-detail/components/modals-drawers/create-edit-log-entry-modal';
import { DeleteLogEntryModal } from '@features/managers-log-detail/components/modals-drawers/delete-log-entry-modal';
import { FillingSettingWarnModal } from '@features/managers-log-detail/components/modals-drawers/filling-setting-warn-modal';
import { MobileCreateEditLogEntryDrawer } from '@features/managers-log-detail/components/modals-drawers/mobile-create-edit-log-entry-drawer';
import { MobileDeleteLogEntryDrawer } from '@features/managers-log-detail/components/modals-drawers/mobile-delete-log-entry-drawer';
import { MobileFillingSettingWarnDrawer } from '@features/managers-log-detail/components/modals-drawers/mobile-filling-setting-warn-drawer';
import { MobileFilterDrawer } from '@features/managers-log-detail/components/modals-drawers/mobile-filter-drawer';
import { MobileSearchDrawer } from '@features/managers-log-detail/components/modals-drawers/mobile-search-drawer';
import { MobileTagPeopleDrawer } from '@features/managers-log-detail/components/modals-drawers/mobile-tag-people-drawer';
import { TagPeopleModal } from '@features/managers-log-detail/components/modals-drawers/tag-people-modal';
import {
  INFO_AND_FILTERS_BAR_HEIGHT,
  SETTING_FIELDS_HEIGHT,
} from '@features/managers-log-detail/constants/layout';
import { useRequestLogDetail } from '@features/managers-log-detail/hooks/api/use-request-log-detail';
import { useRequestLogEntries } from '@features/managers-log-detail/hooks/api/use-request-log-entries';
import { useActiveModuleOnScroll } from '@features/managers-log-detail/hooks/use-active-module-on-scroll';
import { useHasFilledAllSettings } from '@features/managers-log-detail/hooks/use-has-filled-all-settings';
import {
  fillingSettingWarnModalAtom,
  mobileFillingSettingWarnDrawerAtom,
} from '@features/managers-log-detail/states/modals-drawers';
import { GenericMobileHeader } from '@shared/components/common/generic-mobile-header';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { AppRoute } from '@shared/constants/app-route';
import {
  APP_MOBILE_FOOTER_ACTIONS_HEIGHT,
  APP_HEADER_HEIGHT,
} from '@shared/constants/layout';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { computeMaxViewportHeight } from '@shared/utils/compute-max-viewport-height';

export default function PageManagersLogDetail() {
  const router = useRouter();

  const isMobile = useIsMobile();

  const theme = useTheme();

  const { data: getLogDetailResponse } = useRequestLogDetail();

  const hasFilledSettings = useHasFilledAllSettings();

  const { data: logEntryResponse, isValidating: logEntryLoading } =
    useRequestLogEntries();

  const handleBackToList = () => {
    if (hasFilledSettings) {
      router.push(AppRoute.ManagersLog);
    } else if (isMobile) {
      defaultStore.set(mobileFillingSettingWarnDrawerAtom, true);
    } else {
      defaultStore.set(fillingSettingWarnModalAtom, true);
    }
  };

  const logDetail = getLogDetailResponse?.data;

  const modules = logEntryResponse?.data.modules ?? [];

  const orderedModules = modules.sort((a, b) => a.order - b.order);

  const { handleScroll, handleModuleInViewChange } =
    useActiveModuleOnScroll(orderedModules);

  return (
    <>
      <CreateEditLogEntryModal />
      <DeleteLogEntryModal />
      <MobileFilterDrawer />
      <TagPeopleModal />
      <MobileCreateEditLogEntryDrawer />
      <MobileSearchDrawer />
      <MobileDeleteLogEntryDrawer />
      <MobileTagPeopleDrawer />
      <FillingSettingWarnModal />
      <MobileFillingSettingWarnDrawer />
      <Box
        sx={{
          display: 'flex',
          maxHeight: computeMaxViewportHeight([APP_HEADER_HEIGHT]),
          overflow: 'hidden',
        }}
      >
        <SidePanel sx={{ flexShrink: 0 }} />
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column',
            flex: 1,
            [theme.breakpoints.down('md')]: {
              pt: `${INFO_AND_FILTERS_BAR_HEIGHT}px`,
              pb: `${APP_MOBILE_FOOTER_ACTIONS_HEIGHT}px`,
              maxWidth: '100dvw',
            },
          }}
        >
          <GenericMobileHeader
            onBack={handleBackToList}
            title={logDetail?.facilityName}
            sx={{ position: 'fixed', top: 0, zIndex: 1, width: 1 }}
          />
          <InfoAndFiltersBar />
          <Box
            sx={{
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          >
            <SettingFields />
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: 1,
              backgroundColor: theme.palette.catskillWhite,
              overflowY: 'auto',
              height: computeMaxViewportHeight([
                APP_HEADER_HEIGHT,
                INFO_AND_FILTERS_BAR_HEIGHT,
                SETTING_FIELDS_HEIGHT,
              ]),
              [theme.breakpoints.down('md')]: {
                height: computeMaxViewportHeight([
                  APP_HEADER_HEIGHT,
                  INFO_AND_FILTERS_BAR_HEIGHT,
                  APP_MOBILE_FOOTER_ACTIONS_HEIGHT,
                ]),
              },
            }}
            onScroll={handleScroll}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  py: 3,
                  display: 'flex',
                  gap: 3,
                  flexFlow: 'column',
                  mx: 'auto',
                  maxWidth: 660,
                  width: 1,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: '100dvw',
                  },
                }}
              >
                {logEntryLoading && <LoadingIndicator />}
                {!logEntryLoading &&
                  orderedModules.map((module) => (
                    <ModuleSection
                      key={module.id}
                      module={module}
                      onInViewChange={(inView) =>
                        handleModuleInViewChange(inView, module.id)
                      }
                    />
                  ))}
              </Box>
              <MobileFooterActions />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
