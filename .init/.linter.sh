#!/bin/bash
cd /home/kavia/workspace/code-generation/multi-agent-chatbot-platform-36115-36124/multiagent_chatbot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

