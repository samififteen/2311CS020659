import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const filters = ["All", "Placement", "Result", "Event"];

export function NotificationFilter({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(e, val) => {
        if (val !== null) onChange(val);
      }}
      size="small"
      sx={{ flexWrap: "wrap", gap: 1 }}
    >
      {filters.map((type) => (
        <ToggleButton
          key={type}
          value={type}
        >
          {type}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}