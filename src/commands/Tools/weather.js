const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const emojiFlags = require('emoji-flags');
const tvkd = require('tieng-viet-khong-dau');
const { prefix, api_bingmaps, api_here_rest, api_accu } = require('../../data/config.json');

module.exports = {
	name: 'weather',
	category: 'Tools',
	aliases: ['wt', 'tt'],
	description: 'Xem thông tin thời tiết của này hôm nay',
	usage: `\`${prefix}weather <địa điểm>\``,
	data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Thời tiết hiện tại')
	.addStringOption(option => option.setName('location').setDescription('Thời tiết cho một chiếc thành phố xinh')),
	async execute(client, message, args) {
		if (typeof args == 'undefined') {
			args = message.options.getString('location').split(/ +/g);
		}
		if (!args[0]) {
			let content = ""
			content += `Cậu quên nhập địa điểm gòi?\nLàm theo mình chỉ nhá: ${this.usage}`;
			if (typeof this.aliases != 'undefined') {
				content += `\nCậu có thể thay \`${prefix}${this.name}\` bằng `;
				this.aliases.forEach(alias => {
					content += `\`${prefix}${alias}\` `
				});
				content += "cho tiện nhé!"
			}
			message.reply(content);
			return;
		}
		if (args) {
			let data_HERE = (await get_geocode_HERE(args));
			let data_loc_ACCU = (await get_location_ACCU(data_HERE.lat,data_HERE.lon));
			let data_ACCU_NOW = (await get_ACCU_NOW(data_loc_ACCU.key));
			let data_ACCU_D1 = (await get_ACCU_D1(data_loc_ACCU.key));
			let url_BingMaps = `http://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${data_HERE.lat},${data_HERE.lon}/16?mapSize=600,300&pp=${data_HERE.lat},${data_HERE.lon};66&mapLayer=Basemap,Buildings&key=${api_bingmaps}`;
			let embed = new MessageEmbed()
				.setColor("#FFDCF4")
				.setAuthor("Dự Báo thời tiết")
				.setTitle(`Thời tiết: ${data_loc_ACCU.local}, ${data_loc_ACCU.area.LocalizedName}, ${data_loc_ACCU.country.LocalizedName} ${emojiFlags.countryCode(data_loc_ACCU.country.ID).emoji}`)
				.setURL(data_ACCU_NOW.Link)
				.setDescription(data_ACCU_NOW.WeatherText + "\n" + data_ACCU_D1.Headline.Text)
				.addFields(
					{
						name: ':thermometer: Nhiệt độ hiện tại: ',
						value: `${data_ACCU_NOW.Temperature.Metric.Value}°C`,
						inline: false,
					},
					{
						name: ':desert: Ngoài trời: ',
						value: `${data_ACCU_NOW.RealFeelTemperature.Metric.Value}°C`,
						inline: true,
					},
					{
						name: ':beach: Bóng râm: ',
						value: `${data_ACCU_NOW.RealFeelTemperatureShade.Metric.Value}°C`,
						inline: true,
					},
					{
						name: ':fog: Điểm Sương: ',
						value: `${data_ACCU_NOW.DewPoint.Metric.Value}°C`,
						inline: true,
					},
					{
						name: ':arrow_upper_right: Cao nhất: ',
						value: `${data_ACCU_D1.DailyForecasts[0].Temperature.Maximum.Value}°C`,
						inline: true,
					},
					{
						name: ':arrow_lower_right: Thấp nhất: ',
						value: `${data_ACCU_D1.DailyForecasts[0].Temperature.Minimum.Value}°C`,
						inline: true,
					},
					{
						name: ':cloud: Trần mây',
						value: `${data_ACCU_NOW.Ceiling.Metric.Value}m`,
						inline: true
					},
					{
						name: ':microbe: Độ ẩm: ',
						value: `${data_ACCU_NOW.RelativeHumidity}%`,
						inline: true,
					},
					{
						name: ':fire_extinguisher: Áp suất: ',
						value: `${data_ACCU_NOW.Pressure.Metric.Value}hPa (${data_ACCU_NOW.PressureTendency.LocalizedText})`,
						inline: true,
					},
					{
						name: ':eyes: Tầm nhìn: ',
						value: `${data_ACCU_NOW.Visibility.Metric.Value}km`,
						inline: true,
					},
					{
						name: ':compass: Hướng gió: ',
						value: `${data_ACCU_NOW.Wind.Direction.Localized}`,
						inline: true,
					},
					{
						name: ':triangular_ruler: Góc gió: ',
						value: `${data_ACCU_NOW.Wind.Direction.Degrees}°`,
						inline: true,
					},
					{
						name: ':dash: Tốc độ gió: ',
						value: `${data_ACCU_NOW.Wind.Speed.Metric.Value}km/h`,
						inline: true,
					},
					{
						name: `:cloud: Mây che phủ:`,
						value:`${data_ACCU_NOW.CloudCover}%`,
						inline: true
					},
					{
						name: `:white_sun_small_cloud: Thời gian nắng:`,
						value:`${data_ACCU_D1.DailyForecasts[0].HoursOfSun} giờ`,
						inline: true
					},
					{
						name: ":fire: Chỉ số UV:",
						value: `${data_ACCU_NOW.UVIndex} (${data_ACCU_NOW.UVIndexText})`,
						inline: true
					},
					{
						name: ':foggy: Chất lượng không khí',
						value: `${data_ACCU_D1.DailyForecasts[0].AirAndPollen[0].Value} (${data_ACCU_D1.DailyForecasts[0].AirAndPollen[0].Category})`,
						inline: true
					},
					{
						name: ':house: Không khí trong nhà',
						value: `${data_ACCU_D1.DailyForecasts[0].AirAndPollen[0].Value} (${data_ACCU_D1.DailyForecasts[0].AirAndPollen[2].Category})`,
						inline: true
					},
					{
						name: ':park: Không khí thực vật',
						value: `${data_ACCU_D1.DailyForecasts[0].AirAndPollen[0].Value} (${data_ACCU_D1.DailyForecasts[0].AirAndPollen[1].Category})`,
						inline: true
					},
					{
						name: ':sunrise: Bình minh: ',
						value: `${new Date(data_ACCU_D1.DailyForecasts[0].Sun.EpochRise*1000)}`,
						inline: false,
					},
					{
						name: ':city_dusk: Hoàng Hôn: ',
						value: `${new Date(data_ACCU_D1.DailyForecasts[0].Sun.EpochSet*1000)}`,
						inline: false,
					},
					{
						name : ":full_moon_with_face: Trăng lên:",
						value: `${new Date(data_ACCU_D1.DailyForecasts[0].Moon.EpochRise*1000)}`,
						inline: true
					},
					{
						name : ":new_moon_with_face: Trăng lặng: ",
						value: `${new Date(data_ACCU_D1.DailyForecasts[0].Moon.EpochSet*1000)}`,
						inline: true
					},
					{
						name: ':mailbox: : Địa chỉ:',
						value: `${data_HERE.address.Label}`,
						inline: false,
					},
					{
						name: ':map: Hành Chính: ',
						value: `${data_HERE.address.Subdistrict === undefined ? "" :data_HERE.address.Subdistrict+","} ${data_HERE.address.District === undefined ? "" :data_HERE.address.District+","} ${data_HERE.address.City}, ${ data_HERE.address.County==data_HERE.address.City ? "" : data_HERE.address.County+ ","} ${data_HERE.address.AdditionalData[0].value} `,
						inline: true,
					}
				)
				.setImage(url_BingMaps)
				.setFooter(`${message.member.user.username} requested at ${data_HERE.lat},${data_HERE.lon}`)
				.setTimestamp();
			return message.reply({embeds: [embed]});
		}
	},
};

/**
 * * HERE.API.GEOCODER
 * ? API 6.2
 * TODO return Latitude, Longitude, Detail address {JSON}
 * @param {Array} args
 */

const get_geocode_HERE = async (args) => {
	let url = `https://geocoder.ls.hereapi.com/search/6.2/geocode.json?languages=vi-VN&axresults=1&searchtext=${tvkd.cLowerCase(args.join("+"))}&apiKey=${api_here_rest}`

	try {
		response = await axios.get(url)
		hereapi = response.data;
		return {
			lat : hereapi.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
			lon : hereapi.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
			address : hereapi.Response.View[0].Result[0].Location.Address
		};
	} catch (err) {

		console.log("ERROR: HERE API");
		console.log(url);
		console.log(err);
		return;
	}
}

/**
 * * ACCU.API.CITYSEARCH
 * ? API V1
 * TODO return Location ACCU {JSON}
 * @param {JSON} HERE_address
 */
const get_location_ACCU = async (lat,lon) => {
	let url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_accu}&q=${lat},${lon}&language=vi-vn&details=true`;

	try {
		response = await axios.get(url);
		return {
			key : response.data[0].Key,
			local: response.data[0].LocalizedName,
			region : response.data[0].Region,
			country : response.data[0].Country,
			area : response.data[0].AdministrativeArea,
			timezone: response.data[0].TimeZone,
			geo: response.data[0].GeoPosition
		};

	} catch (error) {
		console.log("Lỗi AccuCityID");
		console.log(url);
		console.log(error);
	}
}

/**
 * * ACCU.API.WEATHER.NOW
 * ? Current Conditions API
 * TODO return weather now {JSON}
 * @param {String} location_key
 */
const get_ACCU_NOW = async (location_key) => {
	let url = `http://dataservice.accuweather.com/currentconditions/v1/${location_key}?apikey=${api_accu}&language=vi-vn&details=true`

	try {
		response = await axios.get(url);
		return response.data[0];
	} catch (error) {
		console.log("Lỗi ACCU.API.WEATHER.NOW");
		console.log(url);
		console.log(error);
	}
}

/**
 * * ACCU.API.WEATHER.DAY1
 * ? Current Conditions API
 * TODO return weather now {JSON}
 * @param {String} location_key
 */
const get_ACCU_D1 = async (location_key) => {
	let url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location_key}?apikey=${api_accu}&language=vi-vn&details=true&metric=true`

	try {
		response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.log("Lỗi ACCU.API.WEATHER.DAY1");
		console.log(url);
		console.log(error);
	}
}