const kafka = require('kafka-node')
const uuidv4 = require('uuid/v4');
const config = require('../../config')
const {Producer} = kafka
const client = new kafka.KafkaClient({
  kafkaHost: config.kafkaHost
})

const producerConfig = {
  options: [{
    // Configuration for when to consider a message as acknowledged, default 1
    requireAcks: 1,
    // The amount of time in milliseconds to wait for all acks before considered, default 100ms
    ackTimeoutMs: 100,
    // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
    partitionerType: 2
  }],
  customPartitioner: []
}

const producer = new Producer(client, producerConfig.options)

function sendToTopic(message) {
  producer.send([{
    topic: config.topic1,
    messages: [message],
    key: uuidv4(),
    partition: 0,
    attributes: 0,
   timestamp: Date.now()
  }], (err, data) => {
    if (err) { console.log(err) }
    else { console.log(data) }
  })
}

console.log('starting producer')
producer.on('ready', () => {
  sendToTopic('super dank memes')
})

producer.on('error', (err) => {
  console.log(err)
})
