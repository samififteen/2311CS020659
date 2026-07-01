import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

const PAGE_SIZE = 10;

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const { notifications, loading, error } =
    useNotifications();

  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter(
          (n) => n.Type === filter
        );

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const pageData = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <Box
      sx={{
        maxWidth: 750,
        mx: "auto",
        p: 4,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={3}
      >
        <Badge
          badgeContent={filtered.length}
          color="primary"
        >
          <NotificationsIcon />
        </Badge>

        <Typography variant="h4">
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <NotificationFilter
        value={filter}
        onChange={(value) => {
          setFilter(value);
          setPage(1);
        }}
      />

      <Box mt={3} />

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {!loading &&
        !error &&
        pageData.length === 0 && (
          <Alert severity="info">
            No notifications found.
          </Alert>
        )}

      {!loading &&
        !error &&
        pageData.length > 0 && (
          <Stack spacing={2}>
            {pageData.map((notification) => (
              <NotificationCard
                key={notification.ID}
                notification={notification}
              />
            ))}
          </Stack>
        )}

      <Box
        display="flex"
        justifyContent="center"
        mt={4}
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={(e, value) =>
            setPage(value)
          }
        />
      </Box>
    </Box>
  );
}