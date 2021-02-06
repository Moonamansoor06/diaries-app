import React, { FC, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import http from "../services/api";
import { Entry } from "../interfaces/entry.interface";
import { setEntries } from "../reducers/entriesSlice";
import { setCurrentlyEditing, setCanEdit } from "../reducers/editorSlice";
import dayjs from "dayjs";
import { useAppDispatch } from "../store";
import Grid from "@material-ui/core/Grid";

import { Paper,Card,CardContent,Typography } from "@material-ui/core";

interface ParamTypes {
  id: string;
}
const DiaryEntriesList: FC = () => {
  const { entries } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div>
      <Grid container>
        <Grid item>
          <Link to="/home">
            <h3>← Go Back</h3>
          </Link>
        </Grid>
        <Grid item>
          {entries.map((entry) => (
            <Paper style={{marginTop:'.5rem'}}
              key={entry.id}
              onClick={() => {
                dispatch(setCurrentlyEditing(entry));
                dispatch(setCanEdit(true));
              }}
            ><Card style={{width:'90%', height:'auto'}}>
              <CardContent>
                <Typography variant='body1'>
              {entry.title}
              </Typography>
              <Typography variant='body1'>
              {entry.content}
              </Typography>
              </CardContent>
              </Card>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default DiaryEntriesList;
