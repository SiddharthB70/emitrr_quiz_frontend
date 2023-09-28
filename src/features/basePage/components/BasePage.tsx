import LeaderBoard from "@/features/leaderboard/components/LeaderBoard";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";

const BasePage = () => {
    const [value, setValue] = useState("1");
    return (
        <Box>
            <TabContext value={value}>
                <TabList
                    onChange={(_e, value) => {
                        setValue(value);
                    }}
                >
                    <Tab
                        label="Leaderboard"
                        value="1"
                    />
                    <Tab
                        label="Quiz"
                        value="2"
                    />
                    <Tab
                        label="User"
                        value="3"
                    />
                </TabList>
                <TabPanel value="1">
                    <LeaderBoard />
                </TabPanel>
                <TabPanel value="2">Quiz</TabPanel>
                <TabPanel value="3">User</TabPanel>
            </TabContext>
        </Box>
    );
};

export default BasePage;
