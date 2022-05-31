
const sendTestCompanyRequest = () => {
	return new Promise((resolve, reject) => {
		setTimeout(resolve({
			status: "success",
			message: 'Successfully updated Vertex'
		}), Math.random() * 1000)
	})
}

module.exports = sendTestCompanyRequest