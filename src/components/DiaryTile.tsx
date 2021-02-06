import React, { FC, useState } from "react";
import { Diary } from "../interfaces/diary.interface";
import http from "../services/api";
import { updateDiary } from "../reducers/diariesSlice";
import {setCanEdit,setActiveDiaryId,setCurrentlyEditing,} from "../reducers/editorSlice";
import { showAlert } from "../util";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface Props {
  diary: Diary;
}

const buttonStyle: React.CSSProperties = {
  fontSize: "0.7em",
  margin: "0 0.5em",
};

const DiaryTile: FC<Props> = (props) => {
  const [diary, setDiary] = useState(props.diary);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const totalEntries = props.diary?.entryIds?.length;

  const saveChanges = () => {
    http
      .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert("Saved!", "success");
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="diary-tile">
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ cursor: "pointer", alignItems: "center", textAlign: "center" }}
        className="title"
        title="Click to edit"
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <Input
            value={diary.title}
            onChange={(e) => {
              setDiary({
                ...diary,
                title: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{diary.title}</span>
        )}
      </Typography>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        className="subtitle"
      >
        {totalEntries ?? "0"} saved entries
      </Typography>
      <div style={{ display: "flex" }}>
        <Button
          onClick={() => {
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          
          }}
        >
          Add New Entry
        </Button>

        <Link to={`diary/${diary.id}`} style={{ width: "100%" }}>
          <Button className="secondary" >
            View all
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default DiaryTile;
