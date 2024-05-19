import React from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
  Button,
  Icon,
  useNavigate,
  Input,
} from "zmp-ui";
import { useRecoilValue } from "recoil";
import { displayNameState, userState } from "../state";

const Settings = () => {
  const saveSettings = () => {};

  return (
    <Page className="page flex fex-col ">
      <Box mb={6}>
        <Input label="Endpoint" type="text" placeholder="Http endpoint" />
        <Input label="SecrectKey" type="text" placeholder="Secrect key" />
      </Box>

      <Box mb={6}>
        <Input label="FireBase" type="text" placeholder="Http endpoint" />
        <Input label="SecrectKey" type="text" placeholder="Secrect key" />
      </Box>

      <Button variant="secondary" size="large" onClick={saveSettings}>
        Subbmit
      </Button>
    </Page>
  );
};

export default Settings;
