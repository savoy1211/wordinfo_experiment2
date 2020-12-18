# Word Order Info Experiment
 
This experiment asks users to reorder a set of scrambled words at http://wordinfo-experiment2.herokuapp.com/

### 1. Setup
Installation instructions at https://docs.proliferate.alps.science/en/latest/cli/setup.html
Once proliferate is set up, create the experiment:	
```sh
$ proliferate post woe_final2
```

### 2. Get Results
To download experiment results, run:
```sh
$ proliferate getresults woe_final2
```
#### Note:
To change the experiment URL, edit "completion_URL" in ```woe_final2.config```
Next, make sure to push your changes to proliferate: 
```sh
$ proliferate push woe_final2
```
