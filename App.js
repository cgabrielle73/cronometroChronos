import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import {useState} from 'react';


let timer = null;
let hours = 0;
let minutes = 0;
let seconds = 0;

export default function App() {
  const img = require('./src/crono.png');
  
  const [number, setNumber] = useState(0);
  const [initiate, setInitiate] = useState('INICIAR');
  const [finalHour, setFinalHour] = useState(null);

  function init() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      setInitiate('INICIAR');
    } else {
      timer = setInterval(() => {
        seconds++;
        if(seconds == 60) {
          seconds = 0;
          minutes++;
        } 
        if(minutes == 60) {
          minutes = 0;
          hours++;
        }
        let format = 
        (hours < 10 ? '0' + hours : hours) + ':' 
        + (minutes < 10 ? '0' + minutes : minutes) + ':' 
        + (seconds < 10 ? '0' + seconds : seconds);
        setNumber(format);
      }, 1000);
      setInitiate('PARAR');
    }
  }
  const stop = () => {
    if(timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    setFinalHour(number);
    setNumber(0);
    seconds = 0;
    minutes = 0;
    hours = 0;
    setInitiate('INICIAR');
  
  }

  return (
    <><View style={styles.container}>
      <Image
        source={img} />
      <Text style={styles.timer}> {number} </Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => init()}>
          <Text style={styles.btnText}>
             {initiate}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => stop()}>
          <Text style={styles.btnText}>
            EXCLUIR
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastHour}> 
        <Text style={styles.lastHourText}> {finalHour ? `Ultimo tempo: ${finalHour}` : ''} </Text>
      </View>
    </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  timer: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: -164,
    fontSize: 40,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex:1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 17,
    height: 40,
    borderRadius: 10,
  },
  btnText: {
    color: '#00aeef',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastHour: {
    marginTop: 50,
  },
  lastHourText: {
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: '300',
    color: '#FFF',
  }
});
