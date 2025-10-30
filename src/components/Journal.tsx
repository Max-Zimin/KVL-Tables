import { Accordion, AccordionDetails, AccordionSummary, Skeleton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import type { TypeApiGetJournal } from "../types/types";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 155px 80px 40px;
`;
export default function Journal({ journal }: { journal: TypeApiGetJournal | null }) {
  if (!journal) return <Skeleton variant="rectangular" width={300} height={200} sx={{ backgroundColor: "#4d4d4d", marginLeft: "15px" }} />;

  return (
    <Accordion defaultExpanded style={{ backgroundColor: "#3c3c3c", border: "1px solid grey", color: "#b4b4b4" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
        <Typography component="span">Журнал</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <h3>Последние изменения</h3>
        <div
          style={{
            backgroundColor: "#444444",
            border: "1px solid #555555",
            borderRadius: "5px",
            padding: "5px",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          <Grid>
            <span>{journal[0].name}</span> <span>{journal[0].date}</span> <span>{journal[0].time}</span>
            <span>{journal[1].name}</span> <span>{journal[1].date}</span> <span>{journal[1].time}</span>
            <span>{journal[2].name}</span> <span>{journal[2].date}</span> <span>{journal[2].time}</span>
            <span>{journal[3].name}</span> <span>{journal[3].date}</span> <span>{journal[3].time}</span>
          </Grid>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
