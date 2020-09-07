import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { snakeCase, isEmpty } from 'lodash';
import { images, colors } from '../variables/common.variable';

export function slackFormat(payload = {}) {
  const { req } = payload;
  let headers = {};
  if (!isEmpty(req)) {
    let ipAddr = req.headers['x-forwarded-for'];
    if (ipAddr) {
      const list = ipAddr.split(',');
      ipAddr = list[list.length - 1];
    } else ipAddr = req.connection.remoteAddress;
    headers = { ...headers, ...req.headers, ipAddr };
  }
  return {
    icon_url: images[payload.error.priority],
    username: 'Slack Bugs Notification',
    attachments: [{
      color: colors[payload.error.priority],
      pretext: `Kitabisa 1.0 BE:\n${payload.method} <${payload.url}>`,
      fields: [{
        title: 'Priority',
        value: `\`\`\`${payload.error.priority.toUpperCase()}\`\`\``,
        short: false,
      }, {
        title: 'API Name',
        value: `\`\`\`${payload.error.name}\`\`\``,
        short: false,
      }, {
        title: 'Error Message',
        value: `\`\`\`${JSON.stringify(payload.error.message)}\`\`\``,
        short: false,
      }, {
        title: 'Request Body',
        value: `\`\`\`${JSON.stringify(payload.data)}\`\`\``,
        short: false,
      }, {
        title: 'Request Headers',
        value: `\`\`\`${JSON.stringify(headers)}\`\`\``,
        short: false,
      }],
      thumb_url: 'https://platform.slack-edge.com/img/default_application_icon.png',
      footer: 'Anonim',
      footer_icon: 'https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80',
      ts: moment().unix(),
    }],
  };
}

export function updateFormat(payload = {}) {
  let data = {};
  Object.keys(payload)
    .forEach((key) => {
      data = { ...data, [snakeCase(key)]: payload[key] };
      return data;
    });
  return data;
}

export function addPlayerFormat(payload = {}) {
  return {
    player_id: uuidv4(),
    name: payload.name,
    team_id: payload.teamId,
    is_active: true,
  };
}

export function addTeamFormat(payload = {}) {
  return {
    team_id: uuidv4(),
    name: payload.name,
    is_active: true,
  };
}
